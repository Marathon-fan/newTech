

## Batch Processing of Flink        

```java
        ExecutionEnvironment env = ExecutionEnvironment.getExecutionEnvironment();

        ParameterTool params = ParameterTool.fromArgs(args);

        env.getConfig().setGlobalJobParameters(params); // make the configure available to all the cluster nodes

        DataSet<String> text = env.readTextFile(params.get("input"));

        DataSet<String> filtered = text.filter(new FilterFunction<String>()
```

## Stream execution environment   

```java

    Final StreamExecutionEnvironment evn = StreamExecutionEnvironment.getExecutionEnvironment();

    final ParameterTool params = ParameterTool.fromArgs(args);

    env.getConfig().setGlobalJobParameters(params);

    DataStream<String> text = env.readTextFile(params.get("input"));

    DataStream<Tuple2<String, Integer>> counts = 
        ...
```

## Map, Flatmap, Filter, groupby, Sum    




