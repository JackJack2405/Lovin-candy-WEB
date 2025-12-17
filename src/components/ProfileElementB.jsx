import './ProfileElement.css';

export default function ProfileElementB () {
  return (
    <>
      <div className='element-b'>
        <div className='leftinfo'>
          <img className="picpic" src="https://media.discordapp.net/attachments/1260443532083073145/1444447650618277989/IMG_6535.jpg?ex=694327b4&is=6941d634&hm=7ea8490d19d79fe3f0f0e2ebe2a9e64d0735a3d017060e3e5e043d55b964f657&=&format=webp&width=702&height=702"></img>
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