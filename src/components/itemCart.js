import { Card } from "antd";
const { Meta } = Card;

function ItemCart({ item }) {
  return (
    <Card
      hoverable
      style={{
        width: 240,
      }}
      className="m-2"
      cover={<img alt="preview" src={item.links[0].href} />}
    >
      <Meta title= {item.data[0].title} description={item.data[0].title} />
      
        <p>
            {
              item.data[0].keywords.slice(0,3).map(keyWord => <span className="text-primary"> #{keyWord}</span>)
            }
        </p>
      
    </Card>
  );
}
export default ItemCart;
