import './ProfileElement.css';

export default function ProfileElementB () {
  return (
    <>
      <div className='element-b'>
        <div className='leftinfo'>
          <img className="picpic" src="https://i.ytimg.com/vi/G6ONgCgvnXY/maxresdefault.jpg"></img>
          <p className='b-id'>id1312213</p>
        </div>

        <div className='rightinfo'>
          <div className='tableitems'>
            <span>Completed</span>
            <span>23</span>
          </div>

          <div className='tableitems'>
            <span>To pay</span>
            <span>2</span>
          </div>

          <div className='tableitems'>
            <span>To ship</span>
            <span>1</span>
          </div>

          <div className='tableitems'>
            <span>To receive</span>
            <span>0</span>
          </div>
        </div>
      </div>
    </>
  )
}