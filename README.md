    <>
      <h1 className="text-center text-2xl my-2">Image Report</h1>
      <div className="">
        <table className="w-full bg-white shadow-md rounded-lg overflow-hidden">
          <thead className="bg-green-500 text-white uppercase text-sm leading-normal">
            <tr>
              <th className="py-3 px-6 text-left">id</th>
              <th className="py-3 px-6 text-left">Image Format</th>
              <th className="py-3 px-6 text-left">Thumbnail</th>
              <th className="py-3 px-6 text-left">Link</th>
              <th className="py-3 px-6 text-left">Dimension</th>
              <th className="py-3 px-6 text-left">Size</th>
              <th className="py-3 px-6 text-left">Purpose</th>
              <th className="py-3 px-6 text-left">Name</th>
              <th className="py-3 px-6 text-left">Date</th>
            </tr>
          </thead>
          <tbody className="text-gray-600 text-sm font-light">
            {data &&
              data.map((image) => {
                const isPDF = image.link.toLowerCase().endsWith(".pdf");
                return (
                  <tr className="hover:bg-green-100" key={image.id}>
                    <td className="py-3 px-6 text-left whitespace-nowrap">
                      {image.id}
                    </td>
                    <td className="py-3 px-6 text-left">{image.format}</td>
                    <td className="py-3 px-6 text-left">
                      <div className="flex items-center">
                        {isPDF ? (
                          <div className="bg-red-500 text-white py-1 px-2 rounded">
                            <span>PDF</span>
                          </div>
                        ) : (
                          <img
                            src={image.link}
                            alt={`${image.originalname} thumbnail`}
                            className="h-12 w-12 object-cover rounded hover:scale-150 transition duration-2000 ease-in-out"
                          />
                        )}
                      </div>
                    </td>
                    <td className="py-3 px-6 text-left">
                      <div className="flex items-center">
                        <a
                          href={image.link}
                          className="text-green-500"
                          target="_blank"
                          rel="noopener noreferrer"
                        >
                          {image.link}{" "}
                          <FaExternalLinkAlt className="inline-block ml-1" />
                        </a>
                        <button
                          className="ml-2 p-2 bg-green-500 hover:bg-green-600 text-white rounded"
                          onClick={() => {
                            copyToClipboard(image.link);
                            setCopiedId(image.id);
                            setTimeout(() => setCopiedId(null), 2000);
                          }}
                        >
                          <FaClipboard />
                        </button>
                        {copiedId === image.id && (
                            <span className="text-green-500 ml-2 text-sm">Copied!</span>
                        )}
                      </div>
                    </td>
                    <td className="py-3 px-6 text-left">{image.dimension}</td>
                    <td className="py-3 px-6 text-left">{`${calculateSize(
                      image.size
                    )} KB`}</td>
                    <td className="py-3 px-6 text-left">{image.use}</td>
                    <td className="py-3 px-6 text-left">
                      {image.originalname}
                    </td>
                    <td className="py-3 px-6 text-left">
                      {formatDate(image.date)}
                    </td>
                  </tr>
                );
              })}
          </tbody>
        </table>
      </div>
    </>