<tbody>
    {TableData !== null ? (
        TableData?.map((dataTable, index) => (
            <tr className="" key={index}>
                <td className="px-6 py-4 text-center">
                    {Showdatafrom + index}
                </td>
                {param.map((item, index) => (
                    <td className="px-6 py-4" key={index}>
                        {item === "path_file" ? (
                            <a
                                target="_blank"
                                className="cursor-pointer hover:text-blue-500 hover:underline"
                                href={`${process.env.NEXT_PUBLIC_BASEURL_IMG}${dataTable?.path_file}`}
                            >
                                {dataTable?.path_file}
                            </a>
                        ) : item === "created_date" || item === "expired_date" ? (
                            formatDate(dataTable?.[item])
                        ) : (
                            dataTable[item]
                        )}
                    </td>
                ))}
                {additionalColumns.map((index) => (
                    <td key={index} scope="col" className="px-6 py-3">
                        {handleImageRender(dataTable.icon)}
                    </td>
                ))}
                <td className="">
                    <div className="action flex gap-4 justify-center cursor-pointer">
                        <div className="group relative">
                            <Image
                                src="/icons/edit.png"
                                alt="Logo"
                                width={24}
                                height={24}
                                onClick={() => editData(dataTable.id)}
                                className="z-0 hover:bg-gray-200 hover:rounded-full"
                            />
                            <div className="z-10 hidden group-hover:block absolute bg-gray-700 text-white p-2 rounded-md mt-2">
                                {dict.edit}
                            </div>
                        </div>
                        <div className="group relative">
                            <Image
                                src="/icons/trash.png"
                                alt="Logo"
                                width={24}
                                height={24}
                                onClick={() => handleDelete(dataTable.id)}
                                className="z-0 hover:bg-gray-200 hover:rounded-full"
                            />
                            <div className="z-10 hidden group-hover:block absolute bg-gray-700 text-white p-2 rounded-md mt-2">
                                {dict.delete}
                            </div>
                        </div>
                    </div>
                </td>
            </tr>
        ))
    ) : (
        <tr>
            <td colSpan={param.length + 2}>{dict.dataNotFound}</td>
        </tr>
    )}
</tbody>