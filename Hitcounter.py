from  collections import deque
class Hitcounter  :
    
    def __init__(self) : 
        self.hits = deque()
        
    
    def hit(self , timestamp) : 
        self.hits.append(timestamp)
    
    
    def getHits(self, timestamp) : 
        while self.hits and self.hits[0] <= timestamp -300 : 
            self.hits.popleft()
        return len(self.hits)
    
    
a = Hitcounter()

a.hit(2)
a.hit(10)
a.hit(15)

print(a.getHits(200))
