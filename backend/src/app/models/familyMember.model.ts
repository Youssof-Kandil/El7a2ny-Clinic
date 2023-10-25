import { Relation } from 'clinic-common/types/familyMember.types'
import { Gender } from 'clinic-common/types/gender.types'
import mongoose from 'mongoose'

const Schema = mongoose.Schema

const familyMemberSchema = new Schema(
  {
    name: { type: String, required: true },
    nationalId: { type: String, required: true },
    age: { type: Number, required: true },
    gender: {
      type: String,
      required: true,
      enum: Gender,
    },
    patient:{ type: Schema.Types.ObjectId, ref: 'Patient' }
    ,
    relation: {
      type: String,
      required: true,
      enum: Relation,
    },
    /**
     * Removed this in favor of PatientModel.familyMembers, it makes the query
     * easier and more efficient. And we usually start from the patient and get
     * their family members, not the other way around.
     */
    // relatedTo: { type: Schema.Types.ObjectId, ref: 'Patient', required: true },
  },
  { timestamps: true }
)

export const FamilyMemberModel = mongoose.model(
  'FamilyMember',
  familyMemberSchema
)

export type FamilyMemberDocument = mongoose.InferSchemaType<
  typeof familyMemberSchema
>
