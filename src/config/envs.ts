// "micro-envs" para llamar al snippet
// import 'dotenv/config';
import * as joi from 'joi';

interface EnvVars {
  PORT: number;
  DATABASE_URL: string;
  // NODE_ENV: string;
  // MONGO_URI: string;
}

// Joi es un validador de squema que hace que si el puerto no viene, lance una excepción y no levante el proyecto
const envsSchema = joi
  .object({
    PORT: joi.number(),
    DATABASE_URL: joi.string().required(),
      // .required(),
    // NODE_ENV: joi.string().valid('development', 'production', 'test').default('development'),
    // MONGO_URI: joi.string().required(),
  })
  .unknown(true);

const { error, value } = envsSchema.validate(process.env); // Vamos a validar el process.env con el squema que hemos creado


if (error) {
  console.log(error)
  throw new Error(`Hay un error con el puerto: ${error.message}`);
}

export const envVars: EnvVars = value; // Es una forma para validar el tipado del value del schema.

export const envs = {
  port: envVars.PORT,
  databaseUrl: envVars.DATABASE_URL,
}