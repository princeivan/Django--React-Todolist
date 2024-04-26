import axios from 'axios';
import React, { useState } from 'react'
import { MdOutlineDeleteOutline, MdOutlineEditNote, MdOutlineCheckBox, MdOutlineCheckBoxOutlineBlank } from "react-icons/md";

const Table = ({ todos, setTodos, isLoading }) => {

    const [editText, setEditText] = useState({
        'body': ''
    })


    const handleDelete = async (id) => {
        try {

            await axios.delete(`http://127.0.0.1:8000/api/todo/${id}/`)
            const newList = todos.filter(todo => todo.id !== id)
            setTodos(newList)

        } catch (error) {
            console.log(error)
        }

    }
    const handleEdit = async (id, value) => {
        try {
            const response = await axios.patch(`http://127.0.0.1:8000/api/todo/${id}/`, value)
            const newTodos = todos.map(todo => todo.id === id ? response.data : todo)
            setTodos(newTodos)
        } catch (error) {
            console.log(error)

        }
    }

    const handleCheckbox = (id, value) => {
        handleEdit(id, {
            'completed': !value
        })
    }

    const handleChange = (e) => {
        setEditText(prev => ({
            ...prev,
            'body': e.target.value
        }))
        console.log(editText)
    }

    const handleClick = () => {
        handleEdit(editText.id, editText)
        setEditText({
            'body': ''
        })

    }



    return (
        <div className='py-2'>
            <table className='w-11/12 max-w-4xl'>
                <thead className='border-b-2 border-black'>
                    <tr>
                        <th className='p-3 text-sm font-semibold tracking-wide text-left'>Checkbox</th>
                        <th className='p-3 text-sm font-semibold tracking-wide text-left'>To do</th>
                        <th className='p-3 text-sm font-semibold tracking-wide text-left'>Status</th>
                        <th className='p-3 text-sm font-semibold tracking-wide text-left'>Date Created</th>
                        <th className='p-3 text-sm font-semibold tracking-wide text-left'>Actions</th>

                    </tr>
                </thead>

                {isLoading ? <div>Is Loading</div> :
                    <>
                        <tbody>
                            {todos.map((todoItem, index) => {
                                return (

                                    <tr key={todoItem.id} className='border-b border-black'>
                                        <th className='p-3' title={todoItem.id}>
                                            <span onClick={() => handleCheckbox(todoItem.id, todoItem.completed)}
                                                className='inline-block cursor-pointer'>{todoItem.completed ? <MdOutlineCheckBox /> : <MdOutlineCheckBoxOutlineBlank />}</span>
                                        </th>
                                        <th className='p-3 text-sm'>{todoItem.body}</th>
                                        <th className='p-3 text-sm text-center'>
                                            {todoItem.completed ? <span className='p-1.5 text-xs font-medium tracking-wider rounded-md bg-green-300'>Done</span> :
                                                <span className='p-1.5 text-xs font-medium tracking-wider rounded-md bg-red-300'>Incomplete</span>
                                            }
                                        </th>
                                        <th className='p-3 text-sm'>{new Date(todoItem.created).toLocaleDateString()}</th>
                                        <th className='p-3 text-sm font-medium grid grid-flow-col items-center mt-5'>
                                            <label htmlFor="my_modal_6" className="btn"><span className='txt-xl cursor-pointer'><MdOutlineEditNote onClick={() => setEditText(todoItem)} /></span>
                                            </label>
                                            <span className='txt-xl cursor-pointer'><MdOutlineDeleteOutline onClick={() => handleDelete(todoItem.id)} /></span>
                                        </th>
                                    </tr>
                                )


                            })
                            }
                        </tbody>

                    </>
                }


            </table>


            {/* Put this part before </body> tag */}
            <input type="checkbox" id="my_modal_6" className="modal-toggle" />
            <div className="modal" role="dialog">
                <div className="modal-box">
                    <h3 className="font-bold text-lg">Edit Todo</h3>
                    <input type="text" value={editText.body} onChange={handleChange} className="input input-bordered w-full mt-8 max-w-xs" />
                    <div className="modal-action">
                        <label htmlFor="my_modal_6" onClick={handleClick} className="btn btn-primary">Edit</label>
                        <label htmlFor="my_modal_6" className="btn">Close</label>
                    </div>
                </div>
            </div>
        </div>
    )
}

export default Table