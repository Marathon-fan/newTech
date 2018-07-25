
////-----------------------------------overview
1 understand the Naive Bayes algorith
2 solve sentiment analysis using the naive bayes algorithm
3 understand the support vector machines algorithm
4 solve ad detection using support vector machines algorithm


////-----------------------------------sentiment analysis
problem: a comment
label: positive / negative
features: 
training data: a corpus i.e. large body of texts already labelled as positive/megative 
represent a text using frequency of words in the text
each element in a tuple represents the frequency of some word

Naive bayes - training phase
if we pick a comment at random, the probability of 
1 positive      p0        55%
2 negative      1 - p0    45%

comments/texts are made up of words

features----
we can compute a positivity score and negativity score for every word

training----
the word "hayyp"
Pos(happy) = sum frequency of "happy" in positive comments / sum frequency of "happy" in the entire corpus 
Neg(happy) = 1- Pos(happy)

         positive
happy      90%
love       95%
food       50%
hate       10%
bad        30%

test----
given any new comment 
like "love the food"
pos("love the food") = pos("love") * pos("food")= 0.47
neg("love the food") = (1 - pos("love")) * (1 - pos("food"))= 0.01

Pos(comment) = Pos(word1) * pos(word2) * ....



////-----------------------------------meaning of Naive
No term accounting for a two or more words appearing together

The independence assumption is the reason why Naive Bayes algorithm is called "Naive"

Strengths of Naive Bayes 
1 excellent results for many classification problems
2 robust
3 small amount of data(you have very little training data)


////-----------------------------------
download the data set

https://archive.ics.uci.edu/ml/datasets/Sentiment+Labelled+Sentences


////-----------------------------------
use the Scikit-learning Module in Python


////-----------------------------------

```python

# copy data.txt into docker vm

with open("/testdata/imdb_labelled.txt", "r") as text_file: lines = text_file.read().split('\n')
with open("/testdata/amazon_cells_labelled.txt", "r") as text_file: lines += text_file.read().split('\n')
with open("/testdata/yelp_labelled.txt", "r") as text_file: lines += text_file.read().split('\n')  
lines = [line.split("\t") for line in lines if len(line.split("\t")) == 2 and line.split("\t")[1] != '']
lines

train_documents = [line[0] for line in lines]
train_documents


train_labels = [int(line[1]) for line in lines]
train_labels

from sklearn.feature_extraction.text import CountVectorizer

count_vectorizer = CountVectorizer(binary='true')
train_documents = count_vectorizer.fit_transform(train_documents)
train_documents

# print(train_documents[0]) 

# training phase
from sklearn.naive_bayes import BernoulliNB
classifier = BernoulliNB().fit(train_documents, train_labels)

# test phase
print( classifier.predict(count_vectorizer.transform(["this is the best movie"]))  )
# term frequencies for the test instance
# will return array([1]) as the result     means positive

print( classifier.predict(count_vectorizer.transform(["this is the worst movie"]))  )


```


////-----------------------------------
Ad dection

image features
1 height, width
2 page URL
3 image URL
4 page text
5 image caption text





////-----------------------------------
training phase
SVM 
a large dataset of images which are already labelled as Ad/Non-Ad
represent all the images as points in an N-Dimensional Hypercube

N-Dimensional Hypercube 
-- a line is a 1-dimensional shape    
any point on a line can be represented using 1 number
-- a square is a 2-dimensional shape    
any point on a square can be represented using 2 numbers
-- a cube is a 3-dimensional shape    
any point on a cube can be represented using 3 numbers
-- N-Dimensional Hypercube 
a set of N numbers represents a point in an N-Dimensional Hypercube


In machine learning, support vector machines (SVMs, also support vector networks) are supervised learning models with associated learning algorithms that analyze data used for classification and regression analysis.


represent all the images as points in an N-Dimensional Hypercube

in the training phase, SVM finds a hyperplane that neatly separates the 2 sets of points(ad / non-ad)
The hyperplane acts as a boundary between ads/non-ads

"train a model" using the training data




////-----------------------------------test
in the test phase, we get a new image

check which side of the boundary the new image falls on


SVM(support vector machine) can only be used for binary classification


////-----------------------------------implementing support vector machines

data set
https://archive.ics.uci.edu/ml/datasets/Internet+Advertisements

Each image is 
1 labelled as Ad/Non-Ad
2 represented using around 1500 attributes

////-----------------------------------implement SVM on the Internet Advertisements data set

use pandas lib to read ad.data

use NumPy

```


import numpy as np
import pandas as pd

dataFile = '/ad-dataset/ad.data'
data = pd.read_csv(dataFile, sep = ",", header = None, low_memory = False)

data.head(20)

# check whether a given value is a missing value, if yes change it to NaN
def toNum(cell):
    try:
        return np.float(cell)
    except:
        return np.nan    

# apply missing value check to a column / Pandas series
def seriestoNum(series):
    return series.apply(toNum)

# 
train_data = data.iloc[0:, 0:-1].apply(seriestoNum)
train_data.head(20)

train_data = train_data.dropna()
train_data.head(20)

# now the training data is ready

# get the training lable ready
def toLabel(str):
    if str == 'ad.':
        return 1
    else:
        return 0    

train_labels = data.iloc[train_data.index, -1].apply(toLabel)
train_labels

# training phase
from sklearn.svm import LinearSVC

clf = LinearSVC()
clf.fit(train_data[100:2300], train_labels[100:2300])  
# we don't use all the data for training as we leave some training data for test phase

print ( clf.predict(train_data.iloc[12].values.reshape(1, -1)) )

print( clf.predict(train_data.iloc[-1].values.reshape(1, -1)) )

```

////-----------------------------------summary

1 understand the naive bayes algorithms
solve sentiment analysis using the naive bayes algorithm

2 understand the support vector machines algorithm
solve ad detection using support vector machine algorithm






////-----------------------------------





////-----------------------------------





////-----------------------------------





////-----------------------------------


