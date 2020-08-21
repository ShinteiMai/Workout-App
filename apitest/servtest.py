# -*- coding: utf-8 -*-
"""
Created on Wed Aug 19 14:46:05 2020

@author: aldon
"""
import requests

BASE = "http://127.0.0.1:5000"

data= [{"name": "zyzz", "age": 29, "cultivation": "greek god"},
       {"name": "zyzz2", "age": 39, "cultivation": "greek god2"},
       {"name": "zyzz3", "age": 49, "cultivation": "greek god3"},]

print(data[0] for i in data)
 
for i in range(len(data)):
    response2 = requests.put(BASE + "/helloword/"+ str(i), data[i])
    print (response2.json())

#input()
response3= requests.delete(BASE+ "/helloword/0")

response = requests.get(BASE + "/helloword/1")

print(response.json())
print(response3)