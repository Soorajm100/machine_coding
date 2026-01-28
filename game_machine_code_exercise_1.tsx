import React, { useEffect, useState } from "react";

const MachineCode = () => {
  const setIndex :any= {
    1: "#FF0000",
    2: "#0000FF",
    3: "#00FF2A",
    4: "#FF00DD",
    5: "#FF0000",
    6: "#0000FF",
    7: "#00FF2A",
    8: "#FF00DD",
    9: "#FF0000",
    10: "#0000FF",
    11: "#00FF2A",
    12: "#FF00DD",
    13: "#FF0000",
    14: "#0000FF",
    15: "#00FF2A",
    16: "#FF00DD",
  };
  const Colors: any = [
    { id: 1, color: "red", value: "#FF0000" },
    { id: 2, color: "blue", value: "#0000FF" },
    { id: 3, color: "green", value: "#00FF2A" },
    { id: 4, color: "purple", value: "#FF00DD" },

    { id: 5, color: "red", value: "#FF0000" },
    { id: 6, color: "blue", value: "#0000FF" },
    { id: 7, color: "green", value: "#00FF2A" },
    { id: 8, color: "purple", value: "#FF00DD" },

    { id: 9, color: "red", value: "#FF0000" },
    { id: 10, color: "blue", value: "#0000FF" },
    { id: 11, color: "green", value: "#00FF2A" },
    { id: 12, color: "purple", value: "#FF00DD" },

    { id: 13, color: "red", value: "#FF0000" },
    { id: 14, color: "blue", value: "#0000FF" },
    { id: 15, color: "green", value: "#00FF2A" },
    { id: 16, color: "purple", value: "#FF00DD" },
  ];

  const [activeScoredSquare, setactiveScored] = useState<any[]>([]);

  useEffect(() => {
    if (activeScoredSquare.length % 2 == 0 && activeScoredSquare.length >= 2) {
      const newArr = activeScoredSquare.slice(-2);
      const color1 = setIndex[newArr[0]];
      const color2 = setIndex[newArr[1]];
      const temp = activeScoredSquare;
      if(color1 !== color2) {
        temp.pop(); 
        temp.pop(); 
        setactiveScored(temp); 
      }

    }
  }, [activeScoredSquare]);

  const handleSquare = (id: any) => {
    setactiveScored((prev: any) =>
      prev.includes(id)
        ? prev.filter((item: any) => item !== id)
        : [...prev, id],
    );
  };

  return (
    <div className="pt-4 pl-4 ">
      <div className="grid grid-cols-4 w-80">
        {Colors.map((ele: any, index: any) => {
          return (
            <div
              className={`border border-t-2  w-20 h-20 cursor-pointer`}
              style={{
                backgroundColor: activeScoredSquare.includes(ele.id)
                  ? ele.value
                  : "white",
              }}
              key={ele.id}
              onClick={() => handleSquare(ele.id)}
            ></div>
          );
        })}
      </div>
    </div>
  );
};

export default MachineCode;
