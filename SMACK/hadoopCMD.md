


**test**

Usage: hadoop fs -test -[defsz] URI

Options:

-d: f the path is a directory, return 0.  
-e: if the path exists, return 0.  
-f: if the path is a file, return 0.  
-s: if the path is not empty, return 0.  
-z: if the file is zero length, return 0.  
  
Example:
```
hadoop fs -test -e filename
```


