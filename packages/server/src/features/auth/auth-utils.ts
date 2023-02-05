import jsonwebtoken from 'jsonwebtoken'

export const signJWTAsync = <TPayload extends object>(
  payload: TPayload,
  secretOrPrivateKey: jsonwebtoken.Secret,
  options: jsonwebtoken.SignOptions,
): Promise<string> => {
  return new Promise((resolve, reject) => {
    jsonwebtoken.sign(payload, secretOrPrivateKey, options, (error, token) => {
      if (error) return reject(error.message)
      return resolve(token as string)
    })
  })
}
export const verifyJWTAsync = <TPayload>(
  token: string,
  secretOrPrivateKey: jsonwebtoken.Secret,
  options?: jsonwebtoken.VerifyOptions,
): Promise<TPayload> => {
  return new Promise((resolve, reject) => {
    jsonwebtoken.verify(token, secretOrPrivateKey, options, (error, data) => {
      if (error) return reject(error.message)
      return resolve(data as TPayload)
    })
  })
}
