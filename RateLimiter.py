from  collections import deque
import time
from  collections import defaultdict
class Ratelimiter : 
    
    def __init__(self , maxRequest , window):
        self.window = window
        self.maxRequest = maxRequest
        self.userMap = defaultdict(deque)
    
    
    def isAllowed(self , userId):
        currTime = time.time()
        dq = self.userMap[userId]
        
        while len(dq)> 0 and currTime - dq[0]>= self.window : 
            dq.popleft()
        if len(dq) < self.maxRequest : 
            dq.append(time.time())
            return  True
        return False
                
a = Ratelimiter(2 , 10)
a.isAllowed("alice")
print(a.isAllowed("alice"))
a.isAllowed("alice")
print(a.isAllowed("alice"))
print(a.isAllowed("alice"))
        
        

        

        
        
        
        
        
        
        
        
        
