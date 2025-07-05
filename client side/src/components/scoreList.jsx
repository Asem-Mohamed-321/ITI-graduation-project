export default function CvUpload({ icon = "", title = "", comments = [], className = "" }) {
  return (
    <div className={`m-5 bg-white border-2 border-gray-300 rounded-lg p-4 ${className}`}>
      {/* Icon and Title */}
      <div className="flex items-center space-x-2 mb-3">
        {icon && (
          <img src={icon} alt="icon" className="h-5 w-5 object-contain" />
        )}
        <h1 className="font-bold text-base text-gray-800">{title}</h1>
      </div>

      {/* Comments List */}
      <ul className="list-disc list-inside space-y-1 ml-5 [&>li::marker]:text-xs">
        {comments.map((comment, index) => (
          <li key={index} className="text-xs sm:text-sm text-gray-600">
            {comment}
          </li>
        ))}
      </ul>
    </div>
  );
}
