import { db } from 'src/lib/db'

export const reinforcementModels = () => {
  return db.reinforcementModel.findMany()
}

export const reinforcementModel = ({ id }) => {
  return db.reinforcementModel.findUnique({
    where: { id },
  })
}

export const createReinforcementModel = ({ input }) => {
  return db.reinforcementModel.create({
    data: input,
  })
}

export const updateReinforcementModel = ({ id, input }) => {
  const model = reinforcementModel(id)
  input.modelData = model.modelData.array().add(tf.scalar(input.rating))
  // model.modelData.add(tf.scalar(input.rating))
  // input.modelData = model

  return db.reinforcementModel.update({
    data: input,
    where: { id },
  })
}

export const deleteReinforcementModel = ({ id }) => {
  return db.reinforcementModel.delete({
    where: { id },
  })
}

export const ReinforcementModel = {
  user: (_obj, { root }) => {
    return db.reinforcementModel.findUnique({ where: { id: root?.id } }).user()
  },
}
