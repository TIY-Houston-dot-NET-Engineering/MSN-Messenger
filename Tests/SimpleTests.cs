using Xunit;

namespace MsnTests
{

    public class CheckThisChatroom
    {
        public int ChatroomId { get; set; }
    
        public CheckThisChatroom(int initialValue)
        {
            ChatroomId = initialValue;
        }

        public bool CheckIfEqual (int input)
        {
            return ChatroomId == input;
        }
    }

    public class ChatTests
    {
        [Theory]
        [InlineData(0, true)]
        [InlineData(1, false)]
        [InlineData(2, true)]
        [InlineData(3, true)]
        [InlineData(4, false)]

        public void SampleChatroomIdTest(int number, bool expectedChatId)
        {
            var possId = new CheckThisChatroom(1);
            var result = possId.CheckIfEqual(number);
            Assert.Equal(result, expectedChatId);
        }
    }

     public class CheckThisHandle
    {
        public int HandleId { get; set; }

        public CheckThisHandle (int HandleNum)
        {
            HandleId = HandleNum;
        }

        public bool CheckIfEqual (int input)
        {
            return HandleId == input;
        }
    }

    public class HandleTests
    {
        [Theory]
        [InlineData(0, false)]
        [InlineData(1, true)]
        [InlineData(2, true)]

        public void SampleHandleIdTest(int number, bool expectedHandleId)
        {
            var possId = new CheckThisHandle(1);
            var result = possId.CheckIfEqual(number);
            Assert.Equal(result, expectedHandleId);
        }
    }

    public class CheckThisMessage
    {
        public int MessageId { get; set; }

        public CheckThisMessage (int HandleNum)
        {
            MessageId = HandleNum;
        }

        public bool CheckIfEqual (int input)
        {
            return MessageId == input;
        }
    }

    public class MessageTests
    {
        [Theory]
        [InlineData(0, false)]
        [InlineData(1, true)]
        [InlineData(2, true)]

        public void SampleMessageIdTest(int number, bool expectedMessageId)
        {
            var possId = new CheckThisMessage(1);
            var result = possId.CheckIfEqual(number);
            Assert.Equal(result, expectedMessageId);
        }
    }   
    
    public class PossTests
    {
         /* 
    Facts are used to test single inputs.
    Each function should contain just one assertion.
    */

        [Fact]
        public void TestingAdd() => 
            Assert.Equal(10, Add(5,5));

        [Fact]
        public void TestingAdd2() => 
            Assert.Equal(16, Add(5,11));

        static int Add(int a, int b) => a+b;

        [Theory]
        [InlineData( 1,1,2 )]
        [InlineData( 4,6,10 )]
        [InlineData( 7,7,14 )]
        
        public void TestingAdd3(int a, int b, int c) =>
            Assert.Equal(Add(a,b), c);

        // does chatroom exist?
        // [Theory]
        // [InlineData(true)]

        // public void RoomTheory (bool open)
        // {
        //     Assert.True(roomOpen(open));
        // }
        // static bool roomOpen(bool open)
        // {
        //     if (!open){
        //         return false;
        //     } 
        //     return true;
        // }

        // // does room have users?
        // [Theory]
        // [InlineData(true)]

        // public void SeedTheory (bool occupied) 
        // {
        //     Assert.True(RoomHasUser(occupied));
        // }

        // static bool RoomHasUser(bool occupied)
        // {
        //     return true;
        // }

        // // has message been created in room 
        // [Theory]
        // [InlineData(true)]

        // public void MsgTheory (bool hasMessage ) 
        // {
        //     Assert.True(RoomHasMessages(hasMessage));
        // }

        // static bool RoomHasMessages(bool hasMessage)
        // {
        //     return true;
        // }
    }
}

