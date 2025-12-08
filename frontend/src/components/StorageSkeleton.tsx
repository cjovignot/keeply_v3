const StorageSkeleton = () => {
  return (
    <div className="p-4 bg-gray-800 border border-gray-700 rounded-xl animate-pulse">
      {/* Titre + boutons */}
      <div className="flex items-center justify-between mb-3">
        {/* Nom de l'entrepôt */}
        <div className="w-40 h-5 bg-gray-700 rounded" />

        {/* Icône supprimer */}
        <div className="w-6 h-6 bg-gray-700 rounded" />
      </div>

      {/* Adresse */}
      <div className="w-64 h-4 mb-2 bg-gray-700 rounded" />

      {/* Nombre de boîtes */}
      <div className="w-24 h-4 bg-gray-700 rounded" />
    </div>
  );
};

export default StorageSkeleton;