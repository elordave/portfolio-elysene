export default function Logo() {
  return (
    <div className="flex items-center gap-1">
      {/* Left Block */}
      <div className="flex flex-col gap-[2px]">
        <div className="w-[5px] h-[5px] bg-primary"></div>
        <div className="w-[5px] h-[5px] bg-primary"></div>
      </div>
      
      {/* Slash */}
      <div className="h-[14px] w-[3px] bg-primary transform rotate-[25deg] mx-[1px]"></div>
      
      {/* Right Block */}
      <div className="flex flex-col gap-[2px]">
        <div className="w-[5px] h-[5px] bg-primary"></div>
        <div className="w-[5px] h-[5px] bg-primary"></div>
      </div>
    </div>
  );
}

