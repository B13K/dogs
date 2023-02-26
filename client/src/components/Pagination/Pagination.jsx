import style from "./Pagination.module.css"

const Pagination = ({dogsPerPage, totalDogs, paginate}) => {

    const pageNumbers = [];

    for (let i = 1; i <= Math.ceil(totalDogs / dogsPerPage); i++) {
        pageNumbers.push(i)
        
    }

    return (
        <div className={style.paginationContainer}>
            {
                pageNumbers.map( (number, i) => (
                        <button key={i} onClick={() => paginate(number)}>
                            {number}
                        </button>
                ))
            }
        </div>
    )
}

export default Pagination