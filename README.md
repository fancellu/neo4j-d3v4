# neo4j-d3v4

## Neo4j 3.x accessed via bolt JS driver, plugged into D3 v4 force simulation

This is a proof of concept for anyone wishing to visualize their neo4j 3.x graphs
with a pure javascript solution

### renderer.js 

Uses D3 v4 force simulation, along with labelled edges. The main entry point is:
```setup(links, nodes)```

### standalone.html

This example doesn't access Neo4j, but instead serves the graph from standalone.json
and into renderer.js

### neo4jQuery.js

Uses the bolt pure javascript driver to query neo4j for node and link info. Returns promises

You may well need to enter your particular url:port, name/password

### index.html

This example queries the neo4j database on localhost, via neo4jQuery.js, and returns 
the node and link graphs, which it then plugs into renderer.js
 
The promises from neo4jQuery.js are handled thus:
 ```javascript
Promise.all([getLinks(), getNodes()]).then( function(values){
        session.close()
        setup(values[0], values[1])
    })
```


