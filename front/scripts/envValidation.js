const { writeFileSync } = require('fs')
const path = require('path')
const { Env } = require('../envValidation/index')
const { schema } = require('../envValidation/schema')

const getErrorMessages = ({ path, message, inner }) => {
  if (inner && inner.length) {
    return inner.reduce((acc, { path, message }) => {
      acc[path] = message

      return acc
    }, {})
  }

  return { [path]: message }
}

const getEnvSamples = (examples, [key, keyObject]) => {
  let value = `<${key}>`

  if (keyObject?.flags?.default) {
    value = keyObject.flags.default
  }

  if (keyObject?.allow) {
    value = `<${keyObject.allow.join(' | ')}>`
  }

  return examples.concat(`${key}=${value}\n`)
}

const sampleEnvDocumentation = () => {
  const header = '# Required enviroment variables\n\n'
  const description = '# NOTE: This file should not be edited\n\n'

  const body = Object.entries(schema).reduce((output, [section, schema]) => {
    const { fields } = schema.describe()
    const sectionEnvExamples = Object.entries(fields).reduce(getEnvSamples, '')
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
      schema[key].validateSync(envs, {
        abortEarly: false,
        allowUnknown: true,
      })

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
