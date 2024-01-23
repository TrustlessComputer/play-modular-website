import './styles.css';

function ItemData() {
  // const { setWidth, setDepth, trait } = useStore();
  // const [size, setSize] = React.useState({ w: 0, d: 0 });
  // const [listCubes, setListCubes] = React.useState([]);

  // React.useEffect(() => {
  //   const sizeArray = trait.shape.split('x');
  //   const size = {
  //     w: Number(sizeArray[0]),
  //     d: Number(sizeArray[1]),
  //   };

  // setListCubes(Array.from({ length: size.x * size.z }, (_, index) => index));
  // setSize({ w: size.w, d: size.d });
  //   setWidth(size.w);
  //   setDepth(size.d);
  // }, [trait]);

  return (
    <></>
    // <div className="SliderInputContainer">
    //   <label className="SliderLabel">ItemData</label>
    //   <div
    //     className="gridCube"
    //     onClick={() => {
    //       setWidth(size.w);
    //       setDepth(size.d);
    //     }}
    //     style={{
    //       gridTemplateColumns: `repeat(${size.x}, 1fr)`,
    //       gridTemplateRows: `repeat(${size.z}, 1fr)`,
    //       display: 'grid',
    //     }}
    //   >
    //     {listCubes.map((item) => {
    //       return <span className={'cube'} key={item}></span>;
    //     })}
    //   </div>
    // </div>
  );
}

export default ItemData;
