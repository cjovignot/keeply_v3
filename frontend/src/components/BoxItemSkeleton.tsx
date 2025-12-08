const BoxItemSkeleton = () => {
  return (
    <div className="p-4 min-h-30 bg-gray-900 border border-gray-800 rounded-xl animate-pulse">
      <div className="flex items-center justify-between">
        {/* Numéro */}
        <div className="w-20 h-5 bg-gray-700 rounded" />

        {/* Destination */}
        <div className="w-24 h-4 bg-gray-700 rounded" />
      </div>

      <div className="flex items-center gap-3 mt-4">
        {/* Dimensions */}
        <div className="w-32 h-3 bg-gray-700 rounded" />

        {/* Fragilité */}
        <div className="w-20 h-3 bg-gray-700 rounded" />

        {/* Storage name */}
        <div className="w-24 h-3 bg-gray-700 rounded" />
      </div>
    </div>
  );
};

export default BoxItemSkeleton;