namespace AttendanceTracker.Models
{
    public class User
    {
        public int scholarId { get; set; }
        public string Name { get; set; }
        public string Passwordmap { get; set; }
        public string email { get; set; }
    }

    public class Attendance
    {
        public int AID { get; set; }
        public int scholarId { get; set; }
        public DateTime Data { get; set; }
        public bool Status { get; set; }
    }
    public class Reward
    {
        public int RewardId { get; set; }
        public int scholarId { get; set; }
        public string BadgeName { get; set; }
        public DateTime DateEarned { get; set; }
    }
}
