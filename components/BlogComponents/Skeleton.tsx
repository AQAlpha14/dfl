export const SkeletonInterestedCategoriesbtn = () => {
  return (
    <div
      className={`border border-[#DDD] rounded-full overflow-hidden animate-pulse w-36 h-8 bg-gray-300`}></div>
  );
};
export const SkeletonInterestedCategoriessticky = () => {
  return (
    <div
      className={`border border-[#DDD] rounded-lg overflow-hidden animate-pulse w-full h-4 mb-2 bg-gray-300`}></div>
  );
};
export const SkeletonBlogDetailPage1 = () => {
  return (
    <div className="border border-[#DDD] rounded-xl overflow-hidden animate-pulse">
      <div className="relative">
        <div className="w-full h-52.5 bg-gray-300"></div>
      </div>
    </div>
  );
};
export const SkeletonPopularBlog1 = () => {
  return (
    <div className="border border-[#DDD] rounded-xl overflow-hidden animate-pulse">
      <div className="relative">
        <div className="w-full h-52.5 bg-gray-300"></div>
        <div className="absolute top-0 w-full flex justify-between items-center px-4 pt-4">
          <div className="p-2 bg-gray-300 rounded-[3px] w-20 h-6"></div>
          <div className="bg-gray-300 w-8 h-8 rounded-full"></div>
        </div>
      </div>
      <div className="px-4 py-4 space-y-2">
        <div className="h-6 bg-gray-300 w-24"></div>
        <div className="h-4 bg-gray-300 w-32"></div>
        <div className="h-4 bg-gray-300 w-full"></div>
        <div className="h-4 bg-gray-300 w-3/4"></div>
      </div>
    </div>
  );
};

export const SkeletonPopularBlogs1 = () => {
  return (
    <div className="border border-[#DDD] rounded-xl overflow-hidden animate-pulse">
      <div className="flex">
        <div className="w-32 h-auto bg-gray-300"></div>
        <div className="px-4 py-4 space-y-2 w-full">
          <div className="h-6 bg-gray-300 w-24"></div>
          <div className="h-4 bg-gray-300 w-32"></div>
          <div className="h-4 bg-gray-300 w-full"></div>
          <div className="h-4 bg-gray-300 w-3/4"></div>
        </div>
      </div>
    </div>
  );
};

export const SkeletonBlogCard1 = () => {
  return (
    <div className="border border-[#DDD] rounded-xl overflow-hidden animate-pulse">
      <div className="relative">
        <div className="w-full h-52.5 bg-gray-300"></div>
      </div>
      <div className="px-4 py-4 space-y-2">
        <div className="h-6 bg-gray-300 w-1/4"></div>
        <div className="h-4 bg-gray-300 w-full"></div>
        <div className="h-4 bg-gray-300 w-full"></div>
        <div className="h-4 bg-gray-300 w-1/4"></div>
      </div>
    </div>
  );
};

export const SkeletonPopularBlogsDetail1 = () => {
  return (
    <>
      <div className="secPadding">
      <div className="mb-3 space-y-2">
        <div className="h-4 bg-gray-300 w-full"></div>
        <div className="h-4 bg-gray-300 w-1/4"></div>
      </div>
      <div className="border border-[#DDD] rounded-xl overflow-hidden animate-pulse">
        <div className="relative">
          <div className="w-full h-52.5 bg-gray-300"></div>
          <div className="absolute top-0 w-full flex justify-between items-center px-4 pt-4">
            <div className="p-2 bg-gray-300 rounded-[3px] w-20 h-6"></div>
            <div className="bg-gray-300 w-8 h-8 rounded-full"></div>
          </div>
        </div>
        <div className="px-4 py-4 space-y-2">
          <div className="h-4 bg-gray-300 w-full"></div>
        </div>
      </div>
      <div className="animate-pulse space-y-6">
      {/* Title */}
      <div className="h-6 bg-gray-300 rounded w-3/4"></div>
      <div className="h-4 bg-gray-300 rounded w-1/2"></div>

      {/* Paragraph blocks */}
      {[...Array(3)].map((_, i) => (
        <div key={i} className="space-y-2">
          <div className="h-4 bg-gray-300 rounded w-full"></div>
          <div className="h-4 bg-gray-300 rounded w-11/12"></div>
          <div className="h-4 bg-gray-300 rounded w-5/6"></div>
        </div>
      ))}

      {/* Section heading */}
      <div className="h-5 bg-gray-300 rounded w-2/3 mt-6"></div>

      {/* Paragraph blocks */}
      {[...Array(2)].map((_, i) => (
        <div key={i} className="space-y-2">
          <div className="h-4 bg-gray-300 rounded w-full"></div>
          <div className="h-4 bg-gray-300 rounded w-10/12"></div>
        </div>
      ))}

      {/* Another section heading */}
      <div className="h-5 bg-gray-300 rounded w-1/2 mt-6"></div>

      {/* Paragraph blocks */}
      {[...Array(3)].map((_, i) => (
        <div key={i} className="space-y-2">
          <div className="h-4 bg-gray-300 rounded w-full"></div>
          <div className="h-4 bg-gray-300 rounded w-11/12"></div>
          <div className="h-4 bg-gray-300 rounded w-9/12"></div>
        </div>
      ))}
    </div>
    <div className="animate-pulse space-y-6">
      {/* Title */}
      <div className="h-6 bg-gray-300 rounded w-3/4"></div>
      <div className="h-4 bg-gray-300 rounded w-1/2"></div>

      {/* Paragraph blocks */}
      {[...Array(3)].map((_, i) => (
        <div key={i} className="space-y-2">
          <div className="h-4 bg-gray-300 rounded w-full"></div>
          <div className="h-4 bg-gray-300 rounded w-11/12"></div>
          <div className="h-4 bg-gray-300 rounded w-5/6"></div>
        </div>
      ))}

      {/* Section heading */}
      <div className="h-5 bg-gray-300 rounded w-2/3 mt-6"></div>

      {/* Paragraph blocks */}
      {[...Array(2)].map((_, i) => (
        <div key={i} className="space-y-2">
          <div className="h-4 bg-gray-300 rounded w-full"></div>
          <div className="h-4 bg-gray-300 rounded w-10/12"></div>
        </div>
      ))}

      {/* Another section heading */}
      <div className="h-5 bg-gray-300 rounded w-1/2 mt-6"></div>

      {/* Paragraph blocks */}
      {[...Array(3)].map((_, i) => (
        <div key={i} className="space-y-2">
          <div className="h-4 bg-gray-300 rounded w-full"></div>
          <div className="h-4 bg-gray-300 rounded w-11/12"></div>
          <div className="h-4 bg-gray-300 rounded w-9/12"></div>
        </div>
      ))}
    </div>
    <div className="animate-pulse space-y-6">
      {/* Title */}
      <div className="h-6 bg-gray-300 rounded w-3/4"></div>
      <div className="h-4 bg-gray-300 rounded w-1/2"></div>

      {/* Paragraph blocks */}
      {[...Array(3)].map((_, i) => (
        <div key={i} className="space-y-2">
          <div className="h-4 bg-gray-300 rounded w-full"></div>
          <div className="h-4 bg-gray-300 rounded w-11/12"></div>
          <div className="h-4 bg-gray-300 rounded w-5/6"></div>
        </div>
      ))}

      {/* Section heading */}
      <div className="h-5 bg-gray-300 rounded w-2/3 mt-6"></div>

      {/* Paragraph blocks */}
      {[...Array(2)].map((_, i) => (
        <div key={i} className="space-y-2">
          <div className="h-4 bg-gray-300 rounded w-full"></div>
          <div className="h-4 bg-gray-300 rounded w-10/12"></div>
        </div>
      ))}

      {/* Another section heading */}
      <div className="h-5 bg-gray-300 rounded w-1/2 mt-6"></div>

      {/* Paragraph blocks */}
      {[...Array(3)].map((_, i) => (
        <div key={i} className="space-y-2">
          <div className="h-4 bg-gray-300 rounded w-full"></div>
          <div className="h-4 bg-gray-300 rounded w-11/12"></div>
          <div className="h-4 bg-gray-300 rounded w-9/12"></div>
        </div>
      ))}
    </div>
    <div className="animate-pulse space-y-6">
      {/* Title */}
      <div className="h-6 bg-gray-300 rounded w-3/4"></div>
      <div className="h-4 bg-gray-300 rounded w-1/2"></div>

      {/* Paragraph blocks */}
      {[...Array(3)].map((_, i) => (
        <div key={i} className="space-y-2">
          <div className="h-4 bg-gray-300 rounded w-full"></div>
          <div className="h-4 bg-gray-300 rounded w-11/12"></div>
          <div className="h-4 bg-gray-300 rounded w-5/6"></div>
        </div>
      ))}

      {/* Section heading */}
      <div className="h-5 bg-gray-300 rounded w-2/3 mt-6"></div>

      {/* Paragraph blocks */}
      {[...Array(2)].map((_, i) => (
        <div key={i} className="space-y-2">
          <div className="h-4 bg-gray-300 rounded w-full"></div>
          <div className="h-4 bg-gray-300 rounded w-10/12"></div>
        </div>
      ))}

      {/* Another section heading */}
      <div className="h-5 bg-gray-300 rounded w-1/2 mt-6"></div>

      {/* Paragraph blocks */}
      {[...Array(3)].map((_, i) => (
        <div key={i} className="space-y-2">
          <div className="h-4 bg-gray-300 rounded w-full"></div>
          <div className="h-4 bg-gray-300 rounded w-11/12"></div>
          <div className="h-4 bg-gray-300 rounded w-9/12"></div>
        </div>
      ))}
    </div>
    <div className="animate-pulse space-y-6">
      {/* Title */}
      <div className="h-6 bg-gray-300 rounded w-3/4"></div>
      <div className="h-4 bg-gray-300 rounded w-1/2"></div>

      {/* Paragraph blocks */}
      {[...Array(3)].map((_, i) => (
        <div key={i} className="space-y-2">
          <div className="h-4 bg-gray-300 rounded w-full"></div>
          <div className="h-4 bg-gray-300 rounded w-11/12"></div>
          <div className="h-4 bg-gray-300 rounded w-5/6"></div>
        </div>
      ))}

      {/* Section heading */}
      <div className="h-5 bg-gray-300 rounded w-2/3 mt-6"></div>

      {/* Paragraph blocks */}
      {[...Array(2)].map((_, i) => (
        <div key={i} className="space-y-2">
          <div className="h-4 bg-gray-300 rounded w-full"></div>
          <div className="h-4 bg-gray-300 rounded w-10/12"></div>
        </div>
      ))}

      {/* Another section heading */}
      <div className="h-5 bg-gray-300 rounded w-1/2 mt-6"></div>

      {/* Paragraph blocks */}
      {[...Array(3)].map((_, i) => (
        <div key={i} className="space-y-2">
          <div className="h-4 bg-gray-300 rounded w-full"></div>
          <div className="h-4 bg-gray-300 rounded w-11/12"></div>
          <div className="h-4 bg-gray-300 rounded w-9/12"></div>
        </div>
      ))}
    </div>
    </div>
    </>
  );
};

export const SkeletonBlogCategories1 = () => {
  return (
    <div className="mb-2 border border-[#DDD] rounded-xl overflow-hidden animate-pulse">
      <div className="space-y-2">
        <div className="h-4 bg-gray-300 w-full"></div>
      </div>
    </div>
  );
};

export const SkeletonBlogTags1 = () => {
  return (
    <div className="border border-[#DDD] rounded-xl overflow-hidden animate-pulse">
      <div className="flex items-center space-y-2">
        <div className="h-4 bg-gray-300 w-24"></div>
      </div>
    </div>
  );
};
export const LoadFaqs = () => {
  return (
    <div className="container">
      <div className="mb-4">
        <div className="w-full h-14 rounded-lg animate-pulse bg-gray-300 mb-1"></div>
        <div className="w-full h-14 rounded-lg animate-pulse bg-gray-300 mb-1"></div>
        <div className="w-full h-14 rounded-lg animate-pulse bg-gray-300 mb-1"></div>
        <div className="w-full h-14 rounded-lg animate-pulse bg-gray-300 mb-1"></div>
        <div className="w-full h-14 rounded-lg animate-pulse bg-gray-300 mb-1"></div>
      </div>
    </div>
  );
};