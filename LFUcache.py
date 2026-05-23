from  collections import defaultdict 

class LFUcache : 
    
    def __init__(self, capacity) : 
        self.capacity = capacity 
        self.mp = defaultdict()    #[value, freeq , timestamp]
        self.timestamp = 0 
        
    def get(self , key) : 
        self.timestamp+=1
        if key in  self.mp :
            self.mp[key][1]+=1
            self.mp[key][2] = self.timestamp 
            return self.mp[key]
        return -1 
            
    
    def put(self, key ,value) : 
        if self.capacity ==0 : 
            return 
        self.timestamp += 1 
        if key  in self.mp :
            self.mp[key][0] = value
            self.mp[key][1] +=1
            self.mp[key][2] = self.timestamp 
            return 
        if len(self.mp) >= self.capacity : 
            
            min_freq = 10**9 
            min_timestamp = 10**9
            min_freq_key = 0 
            
            for key  in  self.mp : 
                val ,fr , tm = self.mp[key]
                if fr <  min_freq or ( fr==min_freq and tm < min_timestamp ) :
                    min_freq= fr
                    min_freq_key = key
                    min_timestamp = tm 
            if min_freq_key is  not None : 
                self.mp.pop(min_freq_key , None)
        self.mp[key] = [value , 1  , self.timestamp]
                


a =  LFUcache(2)       

a.put(1 ,2)
a.put(2,3)
a.put(3,4)

print(a.get(1))


                    
            
