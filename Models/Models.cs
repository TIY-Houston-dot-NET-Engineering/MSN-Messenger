using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using System.ComponentModel.DataAnnotations;
using Microsoft.AspNetCore.Identity.EntityFrameworkCore;
using Microsoft.EntityFrameworkCore;
using Microsoft.EntityFrameworkCore.Infrastructure;
using Microsoft.AspNetCore.Builder;
using Microsoft.AspNetCore.Hosting;
using Microsoft.Extensions.Configuration;
using Microsoft.Extensions.DependencyInjection;

public class Chatroom : HasId 
{
    [Required]
    public int Id { get; set; }
    [Required]
    public string Name { get; set; } 
    public virtual ICollection<Message> Messages { get; set; } 
    public int HandleId { get; set; }
    public virtual Handle Handle { get; set; }
    public virtual ICollection<Handle> Handles { get; set; }
    
}
public class Handle : HasId
{
    [Required]
    public int Id { get; set; }
    [Required]
    public string Name { get; set; }
    public virtual ICollection<Message> Messages { get; set; } 

}
public class Message : HasId 
{
    [Required]
    public int Id { get; set; }
    [Required]
    [StringLength(250)]
    public string Text { get; set; }
    public int HandleId { get; set; }
    public virtual Handle Handle { get; set; }
    public int ChatroomId { get; set; }
    public virtual Chatroom Chatroom { get; set; }
    [Required]
    public DateTime createdAt { get; set; }
}
    

// declare the DbSet<T>'s of our DB context, thus creating the tables
public partial class DB : IdentityDbContext<IdentityUser> {
    public DbSet<Handle> Handles { get; set; }
    public DbSet<Chatroom> Chatrooms { get; set; }
    public DbSet<Message> Messages { get; set; }
}

// create a Repo<T> services
public partial class Handler {
    public void RegisterRepos(IServiceCollection services){
        Repo<Handle>.Register(services, "Handles");
        Repo<Message>.Register(services, "Messages",
            d => d.Include(h => h.Handle.Name));
        Repo<Chatroom>.Register(services, "Chatrooms",
            d => d.Include(m => m.Messages).ThenInclude(h => h.Handle.Name));
    }
}