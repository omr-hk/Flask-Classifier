import pickle

import numpy as np
import pandas as pd
from sklearn.tree import DecisionTreeClassifier
from sklearn.model_selection import train_test_split
from sklearn.metrics import accuracy_score,balanced_accuracy_score

class DiabetesModel:
    def __init__(self) -> None:
        self.data = pd.read_csv('/Users/omar/Desktop/SET/model/data/Dataset of Diabetes .csv')
        self.df = self.data.drop(['ID','No_Pation'],axis=1)
        self.df['CLASS'] = self.df['CLASS'].replace({'N ':'N','Y ':'Y'})
        self.df['Gender'] = self.df['Gender'].replace({'f':'F'})
        self.x = pd.get_dummies(self.df.drop(['CLASS'],axis=1),drop_first=True)
        self.y = self.df['CLASS']
        self.x_train,self.x_test,self.y_train,self.y_test = train_test_split(self.x,self.y,random_state=0)
        self.classifier = DecisionTreeClassifier(random_state=0)
        print(self.x.info())
    def train(self):
        self.classifier.fit(self.x_train,self.y_train)
    
    def predict_test_data(self):
        y_pred = self.classifier.predict(self.x_test)
        print('acuracy score: ',accuracy_score(self.y_test,y_pred))
        print('balanced acuracy score: ',balanced_accuracy_score(self.y_test,y_pred))
    
    def predict(self,x):
        y_pred = self.classifier.predict(x)
        return y_pred

model = DiabetesModel()
model.train()
model.predict_test_data()

values = {
        "AGE" : [57],
        "Urea" : [4.1],
        "Cr" : [63],
        "HbA1c" : [9.7],
        "Chol" : [3.6],
        "TG" : [5.1],
        "HDL" : [0.9],
        "LDL" : [2.5],
        "VLDL" : [0.9],
        "BMI" : [30],
        "Gender_M" : [True]
    }
dat = pd.DataFrame(values)
print(model.predict(x=dat))

# with open('DiabetesClassifier.pickle','wb') as f:
#    pickle.dump(model,f)

# with open('DiabetesClassifier.pickle','rb') as f:
#   model = pickle.load(f)