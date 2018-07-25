
////-----------------------------------overview   

1 spot applications of clustering  
2 recognize the difference between classification and clustering   
3 understand how the K-Means Clustering algorithm works  
    

////-----------------------------------Clustering   
is a way to group items together based on some measure of similarity    



////-----------------------------------example   
let's say we want to understand user behavior a at a social network    

the objective is to divide all users into groups i.e. clusters  

maximize intracluster similarity:  
Users in a group must be "similar" to one another   

minimize intercluster similarity: 
Users in different groups must be "dissimilar" to one another   

All users can be represented using some features:    
age, locatoin, frequency of usage for each topic    


////-----------------------------------clustering    
users represented using features can be seen as points in a N-Dimensional space   

Here is 1 way to divide the groups   

Here is another way to divide the groups   

In both cases, "Similarity" is being measured based on the distance between users   

IN real life, the "nearness" might translate to:  
1 linking/following the same topics   
2 being in the same state  
3 being in the same age group   
4 or all of the above   

////-----------------------------------typical cluster setup   
1 dataset   
the entire set of items which will be grouped   

2 features   
represent each datapoint using numeric attributes  
choose attributes relevant to the groups you are seeking  

example1: to group users based on the similarity of usage patterns   
1) frequency of morning login  
2) frequency of evening login  
3) time spent per session   

example1: to group users based on the similarity of likes/dislikes   
1) likes for each topic  
2) shares for each topic  


3 use an algorithm to group the items  
1) K-Means clustering   
2) Hierarchical Clustering   
3) Density-based Clustering  
4) Distribution-based Clustering    







////-----------------------------------Contrasting Clustering and Classification   
Classificaiton: classifying data into pre-defined categories(pre-defined !!!)   
Clustering: grouping data into a set of categories(categories not known before!!!)     


Classificaiton    
1 take one instance   
2 classify it into a pre-defined category(labels)   like Spam/Ham,   positive/negative
3 do this based on training data which has already been classified   

typical classification setup
1) problem statement  
2) features   
3) training   
4) test   

Clustering  
1 take a large number of instances   
2 divide them into groups   
for example:
what kind of groups can these users be divided into?    
what kind of themes are present in this set of articles?  


clustering setup(doesn't have a training stage)   
1) dataset: the entire set of items which will be grouped   
2) features: represent each datapoint using numeric attributes  
3) use an algorithm to group the items   

classification is an example of supervised learning    

clustering is an example of unsupervised learning   


supervised learning(an explicit training phase)   
requires a set of training data for which the output of the ML algorithm is known   
use when you are looing for a specific output

supervised learning(no training phase)   
no training phase   
use when you are looking for interesting patterns that you didn't know existed   

3 the groups are unknown beforehand(!!!!)   


4 Clustering and Classification may go hand by hand   
a set of articles  --Clustering-->   articles grouped based on themes    

a new article --classifier-->  a theme  

In fact, Articles grouped based on themes become training data for the classifier.   

////-----------------------------------





////-----------------------------------





////-----------------------------------




////-----------------------------------




////-----------------------------------





////-----------------------------------





////-----------------------------------




////-----------------------------------




////-----------------------------------





////-----------------------------------





////-----------------------------------




////-----------------------------------




////-----------------------------------





////-----------------------------------





////-----------------------------------


