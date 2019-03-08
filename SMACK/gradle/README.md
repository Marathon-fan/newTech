gradle


# Task types   

## Jar    
```
Assembles a JAR archive.
```

example
```sh
plugins {
    id 'java'
}

group 'bigDataGroup'
version '1.0-SNAPSHOT'

sourceCompatibility = 1.8

repositories {
    mavenCentral()
}

dependencies {
    testCompile group: 'junit', name: 'junit', version: '4.12'
}


// create a single Jar with all dependencies
task fatJar(type: Jar) {
    manifest {
        attributes 'Implementation-Title': 'Gradle Jar File Example',
        'Implementation-Version': version,
        'Main-Class': 'addPrint'
    }
    baseName = project.name + '-all'
    from { configurations.compile.collect { it.isDirectory() ? it : zipTree(it) } }
    with jar
}
```


how to run it
```sh
gradle clean

gradle fatJar    # The Jar is created under the $project/build/libs/ folder

java -jar build/libs/printingMethod-all-1.0-SNAPSHOT.jar
```



# Publishing types  


```sh
gradle artifactoryPublish
```


## create a new project
```
❯ mkdir basic-demo
❯ cd basic-demo

❯ gradle init
```

or use intellij to create a new Java project(recommended)


## debug


Clean cache:
```sh
sudo rm -rf ~/.gradle/caches/
```


intellij set JVM
```
Configure > Project Defaults > Project Structure

configure project JVM under project settings/project

also delete duplicate JVM under platform settings/SDKs
```

