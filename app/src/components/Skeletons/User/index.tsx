export function UserSkeleton() {
  return (
    <>
      <div className="animate-pulse flex items-center space-x-3">
        <div className="flex items-center bg-[#E4E9EB] p-2 rounded-full">
          <div className="w-6 h-6" />
        </div>
        <div className="flex flex-col">
          <div className="h-2.5 rounded-full bg-[#E4E9EB] w-28 mb-2.5"></div>
          <div className="h-2 rounded-full bg-[#E4E9EB] w-16 mb-2.5"></div>
        </div>
      </div>
    </>
  );
}
