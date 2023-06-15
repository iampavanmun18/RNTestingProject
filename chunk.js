import React, { useEffect, useState } from 'react'
import { studentData } from '../data/custom-table-student-data'

const CustomTable = () => {

    const [currentPage, setCurrentPage] = useState(1);
    const [currentDataToPage, setCurrentDataToPage] = useState([])

    useEffect(() => {

        const dataProcess = async () => {
            function sliceIntoChunks(arr, chunkSize) {
                const res = [];
                for (let i = 0; i < arr.length; i += chunkSize) {
                    const chunk = arr.slice(i, i + chunkSize);
                    res.push(chunk);
                }
                return res;
            }

            const chunkOfData = await sliceIntoChunks(studentData, 10)
            console.log('chunkOfData', Array.isArray(chunkOfData))
            console.log('chunkOfData[currentPage -1]', chunkOfData[currentPage - 1])
            var data = await chunkOfData[currentPage - 1];
            setCurrentDataToPage(data)
        }
        dataProcess()
    }, [currentPage])

    console.log('currentDataToPage', currentDataToPage)


    return (
        <div className='container'>
            <div className='row'>
                <table className="table">
                    <thead className="thead-dark">
                        <tr>
                            <th scope="col">#</th>
                            <th scope="col">Name</th>
                            <th scope="col">Gender</th>
                            <th scope="col">Class</th>
                            <th scope="col">Seat</th>
                            <th scope="col">Color</th>
                        </tr>
                    </thead>
                    <tbody>
                        {
                            currentDataToPage?.map((s, i) => {
                                return (
                                    <tr key={s.ID}>
                                        <th scope="row">{s.ID}</th>
                                        <td>{s.Name}</td>
                                        <td>{s.Gender}</td>
                                        <td>{s.Class}</td>
                                        <td>{s.Seat}</td>
                                        <td>{s.Color}</td>
                                    </tr>
                                )
                            })
                        }
                    </tbody>
                </table>

                <nav aria-label="Page navigation example">
                    <ul className="pagination">
                        <li className="page-item">
                            <button className="page-link" onClick={() => setCurrentPage(currentPage - 1)} >Previous</button>
                        </li>
                        <li className="page-item">
                            <button className="page-link">{currentPage}</button>
                        </li>
                        <li className="page-item">
                            <a className="page-link" onClick={() => setCurrentPage(currentPage + 1)}>Next</a>
                        </li>
                    </ul>
                </nav>

            </div>
        </div>
    )
}

export default CustomTable