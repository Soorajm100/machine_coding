from  collections import OrderedDict
from  datetime import date
import time
class Cache : 
    
    def __init__(self , key , value ,ttlSeconds  , capacity ):
        self.key = key
        self.value = value
        self.ttlSeconds = ttlSeconds
        self.capacity = capacity
        self.mp = OrderedDict()
    
    def get(self, key) :
        if key in  self.mp : 
            self.mp.move_to_end(key)
            return self.mp[key]
        return -1 
    
    def put(self, key , value , ttlSeconds):
        if key  in  self.mp :
            self.mp[key] = (value ,time.time())
            self.mp.move_to_end(key)
        else:
            self.mp[key]= (value , time.time())
        
        if len(self.mp) > self.capacity :
            
            currtime = time.time()
            flag = False
            for ele , value in  self.mp.items() : 
                val = value[0]
                eletime = value[1]
                if currtime - eletime >= ttlSeconds : 
                    self.mp.pop(ele , None)
                    flag = True
                    break
            
            if flag == False:
                self.mp.popitem(last=False)
            
        
        
a = Cache(1,1,100 ,2)
a.put(1,1,100)
print(a.get(1))
a.put(2,3,100)
print(a.get(1))
a.put(3,3,100)
print(a.get(2))
print(a.get(1))
print(a.get(3))





a.put(4,5,100)
#print(a.get(2))
#print(a.get(4))
#print(a.get(1))


    
    
    
