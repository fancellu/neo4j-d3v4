var neo = neo4j.v1;
var driver = neo.driver("bolt://localhost", neo.auth.basic("neo4j", "neo4j"));
var session = driver.session();

function getLinks(){
    return session.run("match (n)-[r]->(o) return (id(n)), type(r), (id(o))").then(function (result){
        var links=[]
        result.records.forEach(function (rec){
            var nid=rec._fields[0].low
            var type=rec._fields[1]
            var oid=rec._fields[2].low
            links.push({source: nid, target: oid, type: type});
        })
        return links
    });
}

function getNodes(){

        // neo4j returns ints as split hi/low objects, need to transform back
    function transform(object) {
        for (var property in object) {
            if (object.hasOwnProperty(property)) {
                const propertyValue = object[property];
                if (neo.isInt(propertyValue)) {
                    object[property] = propertyValue.toString();
                } else if (typeof propertyValue === 'object') {
                    transform(propertyValue);
                }
            }
        }
    }

    return session.run("match (n) return properties(n), labels(n), id(n)").then(function (result){
        var nodes=[]
        result.records.forEach(function (rec){
            var properties=rec._fields[0]
            transform(properties)
            var labels=rec._fields[1]
            var id=rec._fields[2].low
            nodes.push({name: JSON.stringify(properties, null, '\n'), label: labels, id: id});
        })
        return nodes
    });
}
