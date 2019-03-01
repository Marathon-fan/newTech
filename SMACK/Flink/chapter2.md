

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

```
readTextFile(path)    --Reads files line wise and returns them as dataset of Strings
readCsvFile(path)     -- takes a csv file as input and returns a dataset of tuples
readFileOfPrimitives(path, Class)   --  Reads each line of file in the form of class mentioned in arguments
ReadFileOfPrimitives(path, delimiter, Class) -- Reads each line of files in the form of class mentioned in arguments using a delimiter
ReadHadoopFile(FileInputFormat, Key, Value, path)  -- Reads Hdfs file
readSequenceFile(Key, Value, path)  -Reads sequence file
```

```java

DataSet<String> text = env.readTextFile(params.get("input"));

DataSet<String> filtered = text.filter(new FilterFunction<String>(){
    public boolean filter(String value) {
        return value.startsWith("N");
    }
});
```

map
```java

public static final class Tokenizer implements MapFunction<String, Tuple2<String, Integer>>
{
@Override
public Tuple2<String, Integer> map(String value) {
    return new Tuple2<String, Integer>(value, 1);
    }    
}


```

flatMap
```java
public static final class Tokenizer implements flatMapFunction<String, Tuple2<String, Integer>> {
    @Override
    public void flatMap(String value, Collector<Tuple2<String, Integer>> out) {
        String[] tokens = value.split(" ");
        for (String token: tokens) {
            out.collect(new Tuple2<String, Integer>(token, 1));     // [(Noman, 1), (Joyce, 1), (Nipun, 1), (Fliyos, 1)]
        }
    }
}
```

groupBy
```java
DataSet<Tuple2<String, Integer>> counts = tokenized.groupBy(0).sum(1);


```

```java

    if (params.has("output")) {
        counts.writeAsCsv(params.get("output"), "\n", " ");
        env.execute("WordCount Example");
    }

```


## run it on flink cli  

submit the job    

```sh
./bin/flink run /pathToJar/wc2.jar --input file:///inputDir/xx.txt --output file:///outputDir/wordcount_out.txt   

```

## joins   

```java

DataSet<Tuple2<Integer, String>> personSet = env.readTextFile(parms.get("input1")).map(new MapFunction<String, Tuple2<Integer, String>>()
{
    public Tuple2<Integer, String> map(String value) {
        String[] words = value.split(",");    //   1,John
                                              //   2,Harry
        return new Tuple2<Integer, String>(Integer.parseInt(words[0]), words[1]);
    }
});

// do the same thing to locationSet
DataSet<Tuple2<Integer, String>> locationSet = //...

// join
DataSet<Tuple3<Integer, String, String>> joined = personSet.join(locationSet).where(0).equalTo(0)
          .with(new JoinFunction<Tuple2<Integer, String>, Tuple2<Integer, String>, Tuple3<Integer, String, String>>) {
              public Tuple3<Integer, String, String> join(Tuple2<Integer. String> person, Tuple2<Integer, String> location) {
                return new Tuple3<Integer, String, String>(person.f0, person.f1, location.f1); //  returns tuple of (1 John DC)
              }
          }); // manually get the output in this function(better practice)   // we get the 0 filed of person, 1 field of person, 1 field of location  

joined.writeAsCsv(params.get("output"), "\n", " ");
env.execute("Join example");


// then we submit the job to flink
./bin/flink run /path/innerjoin.jar --input1 file:///path.person --input2 file:///path/location --output file:///path/innerjoinresult    



```

## outer join   

we can also do outer join using Flink   



