

# feature store   

```
Made up of precomputed features, feature stores create highly curated data to feed into machine learning algorithms — so they represent the computed end of the Data Lake.

Feature stores enable highly curated data and consistent training data sets for machine learning. This offers full traceability from data source to final outcome.
```

```
Feature Store (aka Palette)
Problem
• Hardest part of ML is finding good features
• Same features are often used by different models built by different teams

Solution
• Centralized feature store for collecting and sharing features
• Platform team curates core set of widely applicable features
• Modelers contribute more features as part of ongoing model building
• Meta-data for each feature to track ownership, how computed, where used, etc
• Modelers select features by name & join key. Offline & online pipelines autoconfigured
```

## What are options to create feature store in Hadoop?   

Depends mostly on what you do next with your features and their size.   
Typically features are derived from **raw input stored on HDFS** and stored back to **HDFS,** with a **Hive table overlay** or a **Pig schema**. Next step is **model training** with **Spark or MapReduced** based program (RHadoop...). HBase might be used instead of HDFS.   
You have to consider iterating on your feature generation and updating your model with more recent information (and trimming off older input data too). We almost always partition the raw data by ingest date, and partition the features by batch id for tracking purposes.

## pipeline For Offline Training With Feature Store   

![pipelineForOfflineTrainingWithFeatureStore](./pics/pipelineForOfflineTrainingWithFeatureStore.PNG)


## Pipeline For Online Serving With Feature Store   

![PipelineForOnlineServingWithFeatureStore](./pics/PipelineForOnlineServingWithFeatureStore.PNG)



## serving layer   

Logically, the Serving Layer acts as the interface between Feature Store and its downstream applications and other consumers.   

Sometimes, serving layer means real-time view

![servingLayer](./pics/servingLayer.PNG)

## reference   

https://pooyanjamshidi.github.io/mls//lectures/mls03.pdf
