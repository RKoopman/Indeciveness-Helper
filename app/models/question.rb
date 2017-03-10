class Question < ApplicationRecord
  belongs_to :profile
  has_many :pros
  has_many :cons
end
