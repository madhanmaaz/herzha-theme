# =========================================
# Ruby User Manager App
# =========================================

# ---------- Module ----------
module Greetings
  def greet
    "Hello, #{name}"
  end
end

# ---------- User Class ----------
class User
  include Greetings

  attr_accessor :age, :roles
  attr_reader :name

  def initialize(name, age = nil, roles = ["user"])
    @name = name
    @age = age
    @roles = roles
  end

  def add_role(role)
    @roles << role unless @roles.include?(role)
  end

  def to_s
    "#{name} (#{age}) Roles: #{roles.join(', ')}"
  end
end

# ---------- User Repository ----------
class UserRepository
  def initialize
    @users = []
  end

  def add(user)
    @users << user
  end

  def all
    @users
  end

  def count
    @users.size
  end
end

# ---------- Sample Usage ----------
begin
  repo = UserRepository.new

  # default user
  user1 = User.new("Madhan", 25)
  user1.add_role(:admin)
  repo.add(user1)

  user2 = User.new("Alice", 30)
  repo.add(user2)

  # iterate users
  repo.all.each do |user|
    puts user.greet
    puts user
  end

  # conditional
  if repo.count > 1
    puts "Multiple users in repository"
  else
    puts "Single user"
  end

rescue StandardError => e
  puts "Error: #{e.message}"
end
