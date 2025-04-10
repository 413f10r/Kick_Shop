import Col from 'react-bootstrap/Col';
import Form from 'react-bootstrap/Form';

export default function SizeSection() {
    return (
        <div>
            <Form.Group as={Col} controlId="formGridState">
                <Form.Select
                    value={quantities[index] || 1}
                    className="form-select-sm"
                    style={{ width: '60px' }}
                    onChange={(e) => handleQuantityChange(index, e.target.value)}>
                    <option value="1">1</option>
                    <option value="2">2</option>
                    <option value="3">3</option>
                    <option value="4">4</option>
                    <option value="5">5</option>
                </Form.Select>
            </Form.Group>
        </div>
    )
}