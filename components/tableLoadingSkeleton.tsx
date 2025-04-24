import React from "react";

const TableLoadingSkeleton = () => (
    <div className="p-4 bg-[#2E2A3B] rounded-lg">
        <div className="animate-shimmer h-8 w-48 rounded-md mb-4"></div>
        <div className="space-y-3">
            {[1, 2, 3].map((i) => (
                <div key={i} className="flex items-center p-3 rounded-lg bg-[#49416D]/40 border border-[#D9BBA0]/20">
                    <div className="animate-shimmer h-5 w-28 rounded-md"></div>
                    <div className="flex-1 ml-4">
                        <div className="animate-shimmer h-4 w-3/4 rounded-md mb-2"></div>
                        <div className="animate-shimmer h-3 w-1/2 rounded-md"></div>
                    </div>
                    <div className="animate-shimmer h-8 w-8 rounded-full"></div>
                </div>
            ))}
        </div>
    </div>
);

export default TableLoadingSkeleton;