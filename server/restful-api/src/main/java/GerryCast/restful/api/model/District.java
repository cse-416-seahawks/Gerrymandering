package GerryCast.restful.api.model;

public class District {
    private final String id;
    private final int districtId;
    private final String party;
    private final String lastName;

    public District(final String id, final int districtId, final String party, final String lastName){
        this.id = id;
        this.districtId = districtId;
        this.party = party;
        this.lastName = lastName;

    }
    public String getId(){
        return id;
    }
    public int getDistrictId(){
        return districtId;
    }
    public String getParty(){
        return party;
    }
    public String getLastName(){
        return lastName;
    }
    @Override
    public String toString(){
        return "District{" + "id='" +'\'' + ", district Id='" + districtId +'\'' + ", party='"+party+'\'' + ", Last Name='" + lastName+"'}";
    }
}
