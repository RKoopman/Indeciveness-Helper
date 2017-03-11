class Question < ApplicationRecord
  belongs_to :user
  has_many :pros
  has_many :cons
end
