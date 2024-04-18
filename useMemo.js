// It is a technique which is used in optimizing the application performance by cacing the result of expensive operations


const Result = ({count}) => {
  
  // This funciton will be called every time the component renders - very expensive
  const calculateCount = () => {
    for(let i = 0; i < count; i++) {
      // Operation
    }
  }


  // memoize the calculation
  let memoResult = useMemo(() => {
    calculateCount(count)
  }, [count]);

  return(
    <div>{memoResult}</div>
  )

}