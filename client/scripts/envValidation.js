const { writeFileSync } = require('fs')
const path = require('path')
const { Env } = require('../envValidation/index')
const { schema } = require('../envValidation/schema')

const getErrorMessages = (error) => {
  if (error.errors) {
    return error.errors.reduce((acc, err) => {
      acc[err.path.join('.')] = err.message

      return acc
    }, {})
  }

  return { [error.path]: error.message }
}

const getEnvSamples = (examples, [key, keyObject]) => {
  let value = `<${key}>`

  if (keyObject?._def?.defaultValue) {
    value = keyObject._def.defaultValue
  }

  return examples.concat(`${key}=${value}\n`)
}

const sampleEnvDocumentation = () => {
  const header = '# Required enviroment variables\n\n'
  const description = '# NOTE: This file should not be edited\n\n'

  const body = Object.entries(schema).reduce((output, [section, schema]) => {
    const shape = schema._def.shape()
    const sectionEnvExamples = Object.entries(shape).reduce(getEnvSamples, '')
    const sectionName = `# ${section.toUpperCase()}\n`

    return output.concat(sectionName).concat(sectionEnvExamples).concat('\n')
  }, '')

  const content = header.concat(description).concat(body)

  writeFileSync(path.join(process.cwd(), '.env.example'), content)
}

sampleEnvDocumentation()

const errors = Object.entries(Env)
  .map(([key, envs]) => {
    try {
      schema[key].parse(envs)

      return null
    } catch (error) {
      return getErrorMessages(error)
    }
  })
  .filter((error) => Boolean(error))

if (errors.length > 0) {
  console.error('\x1b[31m%s\x1b[0m', 'Environment variables error')
  console.info(errors)
  process.exit()
}

console.info('\x1b[32m%s\x1b[0m', 'Environment variables OK!')
