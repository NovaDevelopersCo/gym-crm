import { IClient } from '../../schemas'

interface CreateClientDto extends Omit<IClient, 'id' | 'registrationDate'> {}

export default CreateClientDto
