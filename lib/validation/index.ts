import { TypeCheck, TypeCompiler } from '@sinclair/typebox/compiler'
import { TSchema } from '@sinclair/typebox'

export function createValidator<T extends TSchema>(schema: T): TypeCheck<T> {
  return TypeCompiler.Compile(schema)
}

export function validate<T>(validator: TypeCheck<any>, data: unknown): { success: boolean; data?: T; errors?: any[] } {
  if (validator.Check(data)) {
    return { success: true, data: data as T }
  }

  const errors = [...validator.Errors(data)]
  return { success: false, errors }
}

export * from './schemas'
