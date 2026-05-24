
from collections import defaultdict 
import heapq
class Twitter : 
    
    def __init__(self):
        self.count = 0 
        self.followMap =defaultdict(set)
        self.tweetMap = defaultdict(list) #for storing the  tweets
    
    def postTweet(self, userId, tweetId):
        self.tweetMap[userId].append([self.count, tweetId])
        self.count-=1     #not sure why  decremented
    
    
    def getNewsFeed(self, userId): 
        
        res = []
        minHeap = [] 
        # in this loop  for minHeap  you store only last  layer  for all the followeeId
        self.followMap[userId].add(userId)
        for followeeId in  self.followMap[userId] : 
            if followeeId  in self.followMap[userId] : 
                index = len(self.tweetMap[followeeId]) -1 
                count , tweetId = self.tweetMap[followeeId][index]
                minHeap.append([count, tweetId , followeeId , index -1 ])
                #not sure for the same followeeId it goes till 0 
                #because there is no  loop till 0 inside 
                
        heapq.heapify(minHeap)
        #in this loop  you propogate till  index 0 
        while minHeap and len(res)<10 : 
            count , tweetId, followeeId , index = heapq.heappop(minHeap)
         
            res.append(tweetId)
            
            if index >=0 : 
                count, tweetId = self.tweetMap[followeeId][index]
                heapq.heappush(minHeap , [count, tweetId, followeeId, index-1])
        return res
            
            
    def follow(self, followerId, followeeId): 
        self.followMap[followerId].add(followeeId)
    
    
    def unfollow(self , followerId , followeeId):
        if followeeId in self.followMap[followerId] : 
            self.followMap[followerId].remove(followeeId)

        


a = Twitter()

a.postTweet(1,5)
print(a.getNewsFeed(1))
a.follow(1,2)
a.postTweet(2,6)
print(a.getNewsFeed(1))


        
        
