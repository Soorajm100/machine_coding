from  collections import defaultdict 


class Node  : 
    def __init__(self, key , value):
        self.key = key 
        self.value = value
        self.freq = 1 
        self.prev = None
        self.next = None


class DLL : 
    def __init__(self) : 
        self.left = Node(0,0)
        self.right = Node(0,0)
        
        self.left.next= self.right
        self.right.prev= self.left
        self.size = 0 
    
    
    def add(self ,node) : 
        curr = self.left.next
        node.prev = self.left 
        self.left.next = node
        curr.prev = node
        node.next = curr
        self.size+=1
    
    def  remove(self, node) : 
        last = node.prev
        nxt = node.next
        last.next = nxt
        nxt.prev = last
        self.size-=1
    
    def last_remove(self) : 
        if self.size > 0 : 
            last = self.right.prev
            self.remove(last)
            return last
        return None
    
    
class LFUCache : 
    
    def __init__(self, capacity) : 
        self.capacity = capacity 
        self.keyMap = {}
        self.freqMap = defaultdict(DLL)
        self.minFreq = 0 
        
        
    def get(self , key) : 
        if key not in self.keyMap : 
            return -1 
        node  = self.keyMap[key]
        self.update(node)
        return node.value
        
    def put(self, key , value) : 
        
        if self.capacity==0 : 
            return 
        
        if key in  self.keyMap : 
            node = self.keyMap[key] 
            node.value = value
            self.update(node)
            return 
        if len(self.keyMap)==self.capacity : 
            lt = self.freqMap[self.minFreq]
            removed = lt.last_remove()
            self.keyMap.pop(removed.key , None)
        
        node =  Node(key , value)
        self.keyMap[key] = node
        self.minFreq = 1 
        node.freq = 1 
        self.freqMap[1].add(node)
    
    
    def  update(self, node): 
        freq= node.freq 
        lt = self.freqMap[freq]
        lt.remove(node)
        
        if freq == self.minFreq and lt.size ==0 : 
            self.minFreq +=1
        node.freq +=1
        self.freqMap[node.freq].add(node)
        
