import { type SchemaTypeDefinition } from 'sanity'

import { authorType } from './authorType'
import { startupTypes } from './startupTypes'

export const schema: { types: SchemaTypeDefinition[] } = {
  types: [authorType, startupTypes],
}
