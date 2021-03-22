import Link from 'next/link';

const IndexRow = props => (
  <tr>
    <td>
      <p className="p_title mt-0 mb-0">
        <a>{ props.row1_name} : { props.row1_value }</a>
      </p>
      {props.date} , ID: {props.id}
    </td>
    <td>
      <Link href={props.content_url}>
        <a className="btn btn-sm btn-outline-primary"> Edit</a>
      </Link>
    </td>
  </tr>
);
export default IndexRow;
