class User < ApplicationRecord
  belongs_to :user
  has_one :profile
  has_many :questions
end
